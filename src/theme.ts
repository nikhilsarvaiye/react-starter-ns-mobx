export const DefaultTheme = (theme: any) => {
    return {
        components: {
            Checkbox: {
                colorPrimary: '#00b96b',
            },
            Layout: {
                colorBgHeader: theme.useToken().token.colorBgBase,
            },
            Menu: {
                // colorItemBg: theme.useToken().token.colorPrimaryTextActive,
                // colorItemText: theme.useToken().token.colorBgBase,
                // colorItemTextSelected: theme.useToken().token.colorBgBase,
                // colorItemBgHover: theme.useToken().token.colorPrimaryText,
                // colorItemTextHover: theme.useToken().token.colorBgBase,
    
                // colorBgContainer: 'transparent',
                // colorBgLayout: 'transparent',
                // colorItemBg: theme.useToken().token.colorPrimaryTextActive,
                // colorItemText: theme.useToken().token.colorBgBase,
                // colorItemBgSelected: 'rgba(255, 255, 255, 0.2)',
                // colorItemBgHover: theme.useToken().token.colorPrimaryText,
                // colorItemTextHover: theme.useToken().token.colorBgBase,
            },
            Slider: {
                // colorBgContainer: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
                // colorBgBase: 'red', // 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
            }
        },
        token: {
            wireframe: true,
            borderRadius: 0,
            // colorBgBase: 'red',
            // colorBgContainer: 'rgb(240, 242, 245)'
        },
    }
};