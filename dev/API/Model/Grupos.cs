using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Grupos{

    public int Id {get; set;}
    public string Nome {get; set;}

    // Funçao para salvar no banco de dados
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

    // Funçao de busca para trazer todos os objetos
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