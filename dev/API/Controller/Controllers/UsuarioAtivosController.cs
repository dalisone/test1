using Microsoft.AspNetCore.Mvc;
using Model;
using DTO;

namespace Controller.Controllers;

[ApiController]
[Route("usarioAtivos")]
public class UsuarioAtivosController : ControllerBase
{

    [HttpGet]
    [Route("getAll")]

    public object GetAllInformations()
    {
        var usuarioAtivo = Model.Usuario_Ativo.FindAll();
        return usuarioAtivo;
    }

    [HttpPost]
    [Route("register")]
    public object UsuarioAtivosRegister([FromBody] Usuario_Ativo usuario_ativos){ 
        var Id = usuario_ativos.Save(usuario_ativos.Usuario.Id, usuario_ativos.Ativo.Id);
        return new{
            Id = Id,
            Usuario = usuario_ativos.Usuario,
            Ativo = usuario_ativos.Ativo,
            Saldo = usuario_ativos.Saldo
        };
    }

    
}