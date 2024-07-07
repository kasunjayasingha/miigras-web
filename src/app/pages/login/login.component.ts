import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {ValidationHandlerService} from "../../service/validation-handler.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthRequestDTO} from "../../model/AuthRequestDTO";
import Swal from "sweetalert2";
import {UserService} from "../../service/user.service";

interface ngOnInit {
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements ngOnInit, OnDestroy {

  loginSubmitForm = false;
  username: any;
  passwordIncorrect = false;
  password!: string;
  authRequestDTO!: AuthRequestDTO;

  constructor(
    private route: Router,
    private _validationService: ValidationHandlerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _loginService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.authRequestDTO = {
      username: '',
      password: ''

    };
  }

  loginForm = this.formBuilder.group({
    username: [null, [Validators.required, Validators.pattern(this._validationService.emailValidation())]],
    password: [null, [Validators.required, Validators.minLength(3)]],
  });


  get f1() {
    return this.loginForm.controls;
  }

  submitLogin() {
    this.loginSubmitForm = true;
    this.passwordIncorrect = false;
    if (this.loginForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all the fields'});
      return;
    }
    this._loginService.login(this.authRequestDTO).subscribe(result => {
      if (result != null) {
        this.passwordIncorrect = false;
        sessionStorage.setItem("TOKEN", result.accessToken);
        sessionStorage.setItem("ROLE", result.role);
        this.route.navigate(['/miigras-web']);
      }
    }, error => {
      if (error.error.error == 'Bad credentials') {
        this.passwordIncorrect = true;
      } else if (error.error.error == 'User not verified') {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'You account is not activated!',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        });
      }
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      console.log(error.error)
    });
  }

  ngOnDestroy() {

  }

}
