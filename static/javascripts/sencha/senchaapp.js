var currencies = [
  {
    "html":"&euro;",
    "to_euro":1.0,
    "name":"European Euro",
    "abbreviation":"EURO",
    "id":1
  },
  {
    "html":"&#36",
    "to_euro":0.7711,
    "name":"United States Dollar",
    "abbreviation":"USD",
    "id":2
  }
];

Ext.setup({
  tabletStartupScreen: '',
  phoneStartupScreen: '',
  icon: '',
  glossOnIcon: false,
  onReady: function () {
    var converter_card = new Ext.form.FormPanel({
      title: 'Converter',
      cls: 'converter',
      scroll: 'vertical',
      items: [
        {
          xtype: 'numberfield',
          name: 'source_amount',
          label: 'Source Amount'
        },
        {
          xtype: 'selectfield',
          name: 'source',
          label: 'Source',
          options: [
            {
              text: "US Dollars",
              value: "USD"
            },
            {
              text: "British Pound",
              value: "BPD"
            }
          ]
        },
        {
          xtype: 'selectfield',
          name: 'target',
          label: 'Target',
          options: [
            {
              text: "US Dollars",
              value: "USD"
            },
            {
              text: "British Pound",
              value: "GBP"
            }
          ]
        },
        {
          xtype: 'numberfield',
          name: 'target_amount',
          label: 'Target Amount'
        },
      ]
    });
    
    var rates_card = new Ext.Component({
      title: 'Rates',
      cls: 'currencies',
      scroll: 'vertical',
      tpl: [
        '<tpl for=".">',
          '<div class="currency">',
            '<div class="name">{name}</div>',
            '<div class="abbreviation">{abbreviation}</div>',
            '<div class="symbol">{html}</div>',
            '<div class="to_euro">{to_euro}</div>',
          '</div>',
        '</tpl>'
      ]
    });
    
    rates_card.update(currencies);
    
    var panel = new Ext.TabPanel({
      fullscreen: true,
      cardAnimation: 'slide',
      items: [converter_card, rates_card]
    });
    
    
  }
});