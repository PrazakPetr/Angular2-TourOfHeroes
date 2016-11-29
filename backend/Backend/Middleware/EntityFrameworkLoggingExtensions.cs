using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TohBackend;

namespace Microsoft.Extensions.Logging
{
    public static class EntityFrameworkLoggingExtensions
    {
        public static ILoggerFactory AddQueryLogger(this ILoggerFactory loggerFactory)
        {
            loggerFactory.AddProvider(new MyLoggerProvider());

            return loggerFactory;
        }
    }
}
