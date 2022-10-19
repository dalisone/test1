using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Grupos{

    public int Id {get; set;}
    public string Nome {get; set;}

    public int Save(){

        int Id = 0;

        using(var context = new Context()){

            var grupo = new Grupos(){

                Nome = this.Nome,

            };

            context.Grupos.Add(grupo);
            context.SaveChanges();
            Id = grupo.Id;

        }
        return Id;

    }

}