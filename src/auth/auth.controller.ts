import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

///////////////////////////////////////
  @ApiCreatedResponse({
    example:"user created successfuly"
  })

  @ApiBadRequestResponse({
    example:{
      message:"user already exsists",
      error:"Bad Request",
      status:400
    }
  })
  ///////////////////////////////
  @Post('sign-up')
  signUp(@Body() signUpDto:SignUpDto){
    return this.authService.signUp(signUpDto)
  }

  ////////////////////////////////
  @ApiOkResponse({
    example:{
      accesstoken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTY1MzEwNzYyNGVjN2JmOTRjOGYwNTAiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2ODIzOTg0MiwiZXhwIjoxNzY4MjQzNDQyfQ.Rnnn1viDnuLxEb44NLuUEn82vo8btB4tcJJtnk7qniU"
    }
  })
  @ApiBadRequestResponse({
    example:{
      message:"bad request"
    }
  })
  /////////////////////////////////
  @Post("sign-in")
  signIn(@Body() signInDto:SignInDto){
    return this.authService.signIn(signInDto)
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    example:{
      message:{
         "_id": "69653107624ec7bf94c8f050",
        "fullName": "giorgi giorgadze",
        "email": "giorgi55@gmail.com",
        "role": "user",
        "posts": [],
        "createdAt": "2026-01-12T17:36:07.509Z",
        "updatedAt": "2026-01-12T17:36:07.509Z",
        "__v": 0
      }
    }
  })
  @ApiBadRequestResponse({
    example:{
      message:"invalid credentials"
    }
  })
  @UseGuards(AuthGuard)
  @Get("current-user")
  currentUser(@Req() request){
    const userId = request.userId 
    console.log(userId)
    return this.authService.currentUser(userId)
  }
}
