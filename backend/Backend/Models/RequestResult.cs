using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TohBackend.Models
{


    public class RequestResult
    {
        public string AccessToken { get; internal set; }
        public double ExpiresIn { get; internal set; }
        public DateTime RequestAt { get; internal set; }
        public bool Success { get; internal set; }
        public string TokenType { get; internal set; }
        public string Username { get; internal set; }
    }
}
