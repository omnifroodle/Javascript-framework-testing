Ext.setup({
  tabletStartupScreen: '',
  phoneStartupScreen: '',
  icon: '',
  glossOnIcon: false,
  onReady: function () {
    var converter_card = new Ext.Component({
      title: 'Converter',
      cls: 'converter',
      scroll: 'vertical',
      html: "woot"
    });
    
    var rates_card = new Ext.Component({
      title: 'Rates',
      cls: 'rates',
      scroll: 'vertical',
      tpl: [
        '<tpl for=".">',
          '<div class="rate">',
            '<div class="name">{name}</div>',
            '<div class="symbol">{symbol}</div>',
            '<div class="rate">{rate}</div>',
          '</div>',
        '</tpl>'
      ]
    });
    
    var panel = new Ext.TabPanel({
      fullscreen: true,
      cardAnimation: 'slide',
      items: [converter_card, rates_card]
    });
    
    
  }
});