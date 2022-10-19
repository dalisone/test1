using Microsoft.AspNetCore.Mvc;
using Model;
using DTO;

namespace Controller.Controllers;

[ApiController]
[Route("ativos")]
public class AtivosController : ControllerBase
{

    [HttpPost]
    [Route("register")]
    public object AtivoRegister([FromBody] Ativos ativos){ 
        var Id = ativos.Save(ativos.Grupo.Id);
        return new{
            Id = Id,
            Nome = ativos.Nome,
            Grupos = ativos.Grupo
        };
    }

    
}