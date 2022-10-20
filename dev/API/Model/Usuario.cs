using System;
using DTO;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Usuario
{
    
    public int Id {get; set;}

    public DateTime DataNasc {get; set;}
    public string Nome{get; set;}
    public int Tipo{get; set;}
    public string Login {get; set;}
    public string Senha {get; set;}
    public int Gerente {get; set;}


    public int Save(){

        int Id = 0;

        using(var context = new Context()){

            var usuario = new Usuario(){

                DataNasc = this.DataNasc,
                Nome = this.Nome,
                Tipo = this.Tipo,
                Login = this.Login,
                Senha = this.Senha,
                Gerente = this.Gerente

            };

            context.Usuario.Add(usuario);
            context.SaveChanges();
            Id = usuario.Id;

        }
        return Id;

    }

    public static Usuario FindByUser(string login, string senha){

        using (var context = new Context()){

            var usuario = context.Usuario.FirstOrDefault(x => x.Login == login && x.Senha == senha);

            if(usuario != null) return usuario;

            return null;

        }

    }

    public static List<object> FindByGerente(int id){
        
        using(var context = new Context()){

            var cliente = context.Usuario_Ativos.Where(x=> x.Usuario.Gerente == id).Include(x=> x.Usuario);

            List<object> clientes = new List<object>();

            foreach (var item in cliente){
                clientes.Add(item);
            }

            return clientes;
        }

    }

    public static object FindByID(int id){

        using(var context = new Context()){

            var usuario = context.Usuario.FirstOrDefault(x => x.Id == id);
            return new{

                DataNasc = usuario.DataNasc,
                Nome = usuario.Nome,
                Tipo = usuario.Tipo,
                Login = usuario.Login,
                Senha = usuario.Senha,
                Gerente = usuario.Gerente,
                Id = id

            };

        }

    }

     public static List<object> FindByType(){

        using(var context = new Context()){

            var usuario = context.Usuario.Where(x => x.Tipo == 1);
           
            List<object> usuarios = new List<object>();

            foreach (var item in usuario){
                usuarios.Add(item);
            }

            return usuarios;
        }

    }

    public static List<object> FindAll(){

        using(var context = new Context()){

            var usuario = context.Usuario;

            List<object> usuarios = new List<object>();

            foreach (var item in usuario){
                usuarios.Add(item);
            }

            return usuarios;

        }

    }

}