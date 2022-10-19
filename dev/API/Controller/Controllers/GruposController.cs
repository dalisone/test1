using Microsoft.AspNetCore.Mvc;
using Model;
using DTO;

namespace Controller.Controllers;

[ApiController]
[Route("grupos")]
public class GruposController : ControllerBase
{

    
    [HttpGet]
    [Route("getAll")]

    public object GetAllInformations()
    {
        var grupos = Model.Grupos.FindAll();
        return grupos;
    }

    [HttpPost]
    [Route("register")]
    public object GrupoRegister([FromBody] Grupos grupos){ 
        var Id = grupos.Save();
        return new{
            Id = Id,
            Nome = grupos.Nome
        };
    }

    
}