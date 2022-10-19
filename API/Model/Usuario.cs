using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Usuario
{
    
    public int Id {get; set;}

    public DateTime DataNasc {get; set;}
    public string Nome{get; set;}
    public int Tipo{get; set;}
    public string Usuario {get; set;}
    public string Senha {get; set;}

}