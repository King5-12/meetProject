//从环境变量获取API_HOST并写入到window.APP_CONFIG
const WINDOW_CONFIG = {
    API_HOST: process.env.API_HOST || 'http://172.20.90.123:10020',
    GROUP: process.env.GROUP || '',
};

const htmlExtraScript = `window.APP_CONFIG = ${JSON.stringify(WINDOW_CONFIG)}`;

const page = async ctx => {
    if (
        /(MIDP)|(WAP)|(UP.Browser)|(Smartphone)|(Obigo)|(Mobile)|(AU.Browser)|(wxd.Mms)|(WxdB.Browser)|(CLDC)|(UP.Link)|(KM.Browser)|(UCWEB)|(SEMC\-Browser)|(Mini)|(Symbian)|(Palm)|(Nokia)|(Panasonic)|(MOT\-)|(SonyEricsson)|(NEC\-)|(Alcatel)|(Ericsson)|(BENQ)|(BenQ)|(Amoisonic)|(Amoi\-)|(Capitel)|(PHILIPS)|(SAMSUNG)|(Lenovo)|(Mitsu)|(Motorola)|(SHARP)|(WAPPER)|(LG\-)|(LG\/)|(EG900)|(CECT)|(Compal)|(kejian)|(Bird)|(BIRD)|(G900\/V1.0)|(Arima)|(CTL)|(TDG)|(Daxian)|(DAXIAN)|(DBTEL)|(Eastcom)|(EASTCOM)|(PANTECH)|(Dopod)|(Haier)|(HAIER)|(KONKA)|(KEJIAN)|(LENOVO)|(Soutec)|(SOUTEC)|(SAGEM)|(SEC\-)|(SED\-)|(EMOL\-)|(INNO55)|(ZTE)|(iPhone)|(Android)|(Windows CE)|(Wget)|(Java)|(curl)|(Opera)/.test(
            ctx.headers['user-agent'],
        )
    ) {
        ctx.body = `<h1 style="text-align: center; margin-top: 100px">暂不支持移动端，请前往PC端访问<h1>`;
        return;
    }

    await ctx.render('index', {
        htmlExtraScript,
    });
};

module.exports = page;
