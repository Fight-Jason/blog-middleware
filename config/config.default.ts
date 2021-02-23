import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
	const config = {} as PowerPartial<EggAppConfig>;

	// override config from framework / plugin
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1612330430784_5615';

	// add your egg config in here
	config.middleware = [];

	// add your special config in here
	const bizConfig = {
		sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
	};

	config.mysql = {
		// database configuration
		client: {
			// host
			host: 'localhost',
			// port
			port: '3306',
			// username
			user: 'root',
			// password
			password: '123456',
			// database
			database: 'react_blog',
		},
		// load into app, default is open
		app: true,
		// load into agent, default is close
		agent: false,
	}
	config.security = {
		csrf: { enable: false },
		domainWhiteList: ['*']
	};
	config.cors = {
		origin: ctx => ctx.get('origin'), //允许所有来源访问
		credentials: true,  //允许Cook可以跨域
		allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
	};
	// the return config will combines to EggAppConfig
	return {
		...config,
		...bizConfig,
	};
};
