import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Usuarios')
@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // @Get('/getAll')
  // findAll() {
  //   return this.usuarioService.findAll();
  // }

  // @Get('/')
  // findAll() {
  //   return this.usuarioService.findAll();
  // }

  // @Get('/')
  // findOne(@Body('email') email: string) {
  //   return this.usuarioService.findOne(email);
  // }

  // @Get(':email')
  // findOne(@Param('email') email: string) {
  //   return this.usuarioService.findOne(email);
  // }

  @Get(':email/asignaturas')
  findAsignaturas(@Param('email') email: string) {
    return this.usuarioService.getAsignaturas(email);
  }

  // @Get('/:email/asignaturas')
  // findAsignaturas(@Param('email') email: string) {
  //   return this.usuarioService.getAsignaturas(email);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
  //   return this.usuarioService.update(+id, updateUsuarioDto);
  // }

}
