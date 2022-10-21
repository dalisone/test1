using Microsoft.AspNetCore.Mvc;
using DTO;
using Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace Controller.Controllers;

[ApiController]
[Route("usuario")]
public class UsuarioController : ControllerBase
{
   
    public IConfiguration _configuration;

    public UsuarioController(IConfiguration config){
        _configuration = config;
    }

    [HttpGet]
    [Route("getAll")]

    public object GetAllInformations()
    {
        var usuarios = Model.Usuario.FindAll();
        return usuarios;
    }

    [HttpGet]
    [Route("getById")]
    public object GetInformations(){

        var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        var usuario = Model.Usuario.FindByID(id);
        return usuario;

    }

    [HttpPost]
    [Route("getIdByName")]
    public IActionResult GetIdByName([FromBody] UsuarioDTO name){

        if(name != null && name.Nome!=null){
            
            var usuario = Model.Usuario.FindByName(name.Nome);

            if(usuario != null){

                return new ObjectResult(new {
                    id = usuario
                }){
                };
            }
            else{
                return BadRequest("Invalid credentials");
            }
        }
        else{
            return BadRequest("Empty credentials");
        }


    }

    [HttpGet]
    [Route("getByType")]
    public object GetInformationsByType(){

        var usuario = Model.Usuario.FindByType();
        return usuario;

    }

    [HttpGet]
    [Route("getClientes")]
    public object GetClientes(){

        var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        var usuario = Model.Usuario.FindByGerente(id);
        return usuario;

    }

    [HttpPost]
    [Route("register")]

    public object Register([FromBody] Usuario usuario){

        var Id = usuario.Save();
        return new{
            Nome = usuario.Nome,
            DataNasc = usuario.DataNasc,
            Tipo = usuario.Tipo,
            Login = usuario.Login,
            Senha = usuario.Senha,
            Gerente = usuario.Gerente
        };

    }

    [HttpPost]
    [Route("login")]
    public IActionResult tokenGenerate([FromBody] UsuarioDTO login){
        if(login != null && login.Login != null && login.Senha != null){
            var usuario = Model.Usuario.FindByUser(login.Login, login.Senha);
            if(usuario != null){
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UserId", usuario.Id.ToString()),
                    new Claim("UserName", usuario.Nome.ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["JwtAudience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(30),
                    signingCredentials: signIn);
                return new ObjectResult(new {
                    token = Ok(new JwtSecurityTokenHandler().WriteToken(token)).Value,
                    tipo = usuario.Tipo 
                });
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }
        else
        {
            return BadRequest("Empty credentials");
        }
    }

}
