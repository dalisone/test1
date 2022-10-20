using Microsoft.AspNetCore.Mvc;
using Model;
using DTO;

namespace Controller.Controllers;

[ApiController]
[Route("usuarioAtivos")]
public class UsuarioAtivosController : ControllerBase
{

    [HttpGet]
    [Route("getAll")]

    public object GetAllInformations()
    {
        var usuarioAtivo = Model.Usuario_Ativo.FindAll();
        return usuarioAtivo;
    }

    [HttpGet]
    [Route("getByCliente")]
    public object GetInformationById()
    {
        var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        var ativos = Model.Usuario_Ativo.FindById(id);
        return ativos;
    }

    [HttpGet]
    [Route("getUserAtivo/{idAtivo}")]
    public object GetUserAtivo(int idAtivo)
    {
        var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        var ativos = Model.Usuario_Ativo.FindUserAtivo(id, idAtivo);
        return ativos;
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

    [HttpDelete]
    [Route("del/{id}")]
    public object UsuatioAtivoDelete(int id){

        Model.Usuario_Ativo.Delete(id);
        return new {
            status = "objeto foi deletado com sucesso!"
        };

    }

    [HttpPut]
    [Route("mudarSaldo/{id}")]
    public object AdicionarSaldo([FromBody] Usuario_Ativo usuarioAtivo, int id){

        Model.Usuario_Ativo.MudaSaldo(usuarioAtivo, id);
        return new{
            status = "ok",
            mensagem = "sucesso"
        };

    }
    
}