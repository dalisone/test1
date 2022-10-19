using System;
using Microsoft.EntityFrameworkCore;


namespace Model;

public class Ativos{

    public int Id {get; set;}
    public string Nome{get; set;}
    public Grupos Grupo{get; set;}

    public int Save(int GrupoId){

        using(var context = new Context()){

            var grupo = context.Grupos.FirstOrDefault(x => x.Id == GrupoId);
            var obj = new Ativos(){

                Nome = this.Nome,
                Grupo = grupo

            };

            context.Ativos.Add(obj);
            context.SaveChanges();
            Id = obj.Id;

        }
        return Id;

    }

}