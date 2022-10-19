using System;
using Microsoft.EntityFrameworkCore;


namespace Model;

public class Ativos{

    public string Nome{get; set;}
    public Grupos Grupo{get; set;}

}