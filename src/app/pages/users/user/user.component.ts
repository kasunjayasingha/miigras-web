import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../model/UserModel";
import {ConfirmationService, MessageService} from "primeng/api";
import {ValidationHandlerService} from "../../../service/validation-handler.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ConfigService} from "../../../service/config.service";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {Role} from "../../../util/Role";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: UserModel[] = [];
  userCount = 0;
  unchecked = false;
  checked: boolean = true;
  position: string = '';
  addUser = false;
  resetPassword = false;
  userformSubmitted = false;
  userDTO: UserModel = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: Role.ADMIN,
    enabled: false
  }
  roleType = [
    {name: 'Admin', code: 'ADMIN'},
    {name: 'Worker', code: 'WORKER'},
  ];
  isUserExist = false;

  userform = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [null, [Validators.required, Validators.pattern(this._validationService.emailValidation())]],
    role: ['', Validators.required]
  });

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _validationService: ValidationHandlerService,
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _configService: ConfigService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  get f1() {
    return this.userform.controls;
  }

  onClickUserCreate() {
    this.addUser = true;
  }

  onaddUSerSubmit() {
    this.userformSubmitted = true;
    this.isUserExist = false;
    if (this.userform.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all the required fields'});
      return;
    }
    this._userService.register(this.userDTO).subscribe((res: any) => {
      if (res['success'] === "SUCCESS") {
        this.addUser = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User added successfully',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.userform.reset();
            this.userformSubmitted = false;
            this.getAllUsers();
          }
        });
      }
    }, error => {
      if (error.error.error == 'User already exists') {
        this.isUserExist = true;
        this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'User already exists'});
        return;
      }
    });

  }

  setRole(event: any) {
    this.userDTO.role = event.value.code;
  }

  onChangeStatus(user: UserModel) {
    let status = "";
    if (user.enabled) {
      user.enabled = false;
      status = "DEACTIVATED"
    } else {
      user.enabled = true;
      status = "ACTIVATED"
    }
    this._userService.userStatusChange(user).subscribe((res: any) => {
      if (res['success'] === "SUCCESS") {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User ' + status.toLowerCase() + ' successfully'
        });
        this.getAllUsers();
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      this.addUser = false;
      if (error.status === 401) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
        this._configService.logOut();
      }
    });

  }

  editUser(user: UserModel) {
  }

  deleteUser(user: UserModel, position: string) {
  }

  getAllUsers() {
    this.processing();
    this._userService.getAllUsers().subscribe((res: any) => {
      if (res != null) {
        this.users = res;
        Swal.close();
      } else {
        Swal.close();
      }
    }, error => {
      Swal.close();
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      this.addUser = false;
      if (error.status === 401) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
        this._configService.logOut();
      }
    });

  }

  processing() {
    let timerInterval = 0
    Swal.fire({
      title: 'Processing table <b></b> wait..',
      // html: 'Processing... <b></b> wait.',
      icon: 'info',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer()?.querySelector('b')
        timerInterval = setInterval(() => {
          // @ts-ignore
          // b.textContent = Swal.getTimerLeft()
        }, 200)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }
}
