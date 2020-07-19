const development = {
  host: () => "127.0.0.1",
  port: () => "4321",
  fullUrl: () => "http://api.site.com",
  allowedOrigins: () => ["http://site.com", "http://test.site.com"],
  db: {
    client: () => "pg",
    host: () => "127.0.0.1",
    user: () => "app",
    password: () => "app",
    database: () => "app",
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
  port: () => "4322",
  fullUrl: () => "http://testapi.site.com",
  allowedOrigins: () => ["http://site.com", "http://testapi.site.com"],
  db: {
    client: () => "pg",
    host: () => "127.0.0.1",
    user: () => "app",
    password: () => "app",
    database: () => "app",
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
