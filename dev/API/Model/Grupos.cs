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

    public static List<object> FindAll(){

        using(var context = new Context()){

            var grupo = context.Grupos;

            List<object> grupos = new List<object>();

            foreach (var item in grupo){
                grupos.Add(item);
            }

            return grupos;

        }

    }

}