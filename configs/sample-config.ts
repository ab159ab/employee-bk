const development = {
  host: () => "127.0.0.1",
  javaClientPort: () => "8080",
  browserClientPort: () => "9000",
  fullUrl: () => "http://api.site.com",
  allowedOrigins: () => ["http://site.com", "http://test.site.com"],
  db: {
    client: () => "pg",
    host: () => "127.0.0.1",
    user: () => "postgres",
    password: () => "cq123",
    database: () => "employee",
    port:     ()=> 5432,
  },
  fe: {
    cookieDomain: () => ".site.com",
    host: () => "http://site.com",
    port: () => "5321",
    fullUrl: () => "http://site.com",
  },
};

type EnvConfig = typeof development;
const testing: EnvConfig = {
  host: () => "127.0.0.1",
  javaClientPort: () => "8080",
  browserClientPort: () => "9000",
  fullUrl: () => "http://testapi.site.com",
  allowedOrigins: () => ["http://site.com", "http://testapi.site.com"],
  db: {
    client: () => "pg",
    host: () => "127.0.0.1",
    user: () => "postgres",
    password: () => "cq123",
    database: () => "employee",
    port:     ()=> 5432,
  },
  fe: {
    cookieDomain: () => ".site.com",
    host: () => "http://site.com",
    port: () => "5321",
    fullUrl: () => "http://site.com",
  },
};

export const otherConfigs = {
};

export const configs = {
  getEnvObj: (envString:string): EnvConfig => {
    if (envString === "development") { return development; }
    if (envString === "testing") { return testing; }
    throw new Error(`Unexpected envString of ${envString}. Valid values are 'development', 'testing'`);
  },
};
