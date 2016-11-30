using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TohBackend.Auth;
using TohBackend.Models;

namespace TohBackend.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        [HttpPut()]
        public IActionResult Put([FromBody] LoginToken loginToken)
        {
            var requestAt = DateTime.Now;
            var expiresIn = requestAt + TokenAuthOption.ExpiresSpan;
            var token = TokenGenerator.GenerateToken(loginToken.UserName, expiresIn);

            return base.Json(new RequestResult
            {
                Username = loginToken.UserName,
                Success = true,
                RequestAt = requestAt,
                ExpiresIn = TokenAuthOption.ExpiresSpan.TotalSeconds,
                TokenType = TokenAuthOption.TokenType,
                AccessToken = token
            });
        }


    }
}
