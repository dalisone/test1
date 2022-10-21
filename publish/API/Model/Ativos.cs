using System;
using Microsoft.EntityFrameworkCore;


namespace Model;

public class Ativos{

    public int Id {get; set;}
    public string Nome{get; set;}
    public Grupos Grupo{get; set;}

    // Funçao para salvar no banco de dados
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

    
    // Funçao de busca para trazer todos os objetos
    public static List<object> FindAll(){

        using(var context = new Context()){

            var ativo = context.Ativos.Include(x => x.Grupo);

            List<object> ativos = new List<object>();

            foreach (var item in ativo){
                ativos.Add(item);
            }

            return ativos;

        }

    }

}