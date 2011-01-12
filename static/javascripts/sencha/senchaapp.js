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
    Ext.regModel('Currency', {
      fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'abbreviation', type: 'string'},
        {name: 'html', type: 'string'},
        {name: 'to_euro', type: 'float'}
      ]
    });
    var store = new Ext.data.Store({
      model: 'Currency',
      proxy: {
        type: 'rest',
        url: '/currencies',
        // reader: {
        //   type: 'json'
        // }
      }
    });
    store.load();
    
    var convert = function() {
      var start = Number(Ext.getCmp("source_amount").getValue());
      var source = store.getById(Ext.getCmp("source").getValue());
      var target = store.getById(Ext.getCmp("target").getValue());
      if (target != null && source != null) {
        var source_rate = Number(source.get("to_euro"));
        var target_rate = Number(target.get("to_euro"));
        
        var in_euro = start * source_rate;
        var in_target = in_euro / target_rate;
        
        Ext.getCmp("target_amount").setValue("" + in_target);
      }
      else {
        alert("Please select a source and target");
      }
    }
    
    var converter_card = new Ext.form.FormPanel({
      title: 'Converter',
      cls: 'converter',
      scroll: 'vertical',
      items: [
        {
          xtype: 'numberfield',
          name: 'source_amount',
          label: 'Source Amount',
          id: "source_amount",
          value: "10"
        },
        {
          xtype: 'selectfield',
          name: 'source',
          label: 'Source',
          store: store,
          displayField: "name",
          valueField: "id",
          id: "source",
        },
        {
          xtype: 'selectfield',
          name: 'target',
          label: 'Target',
          store: store,
          displayField: "name",
          valueField: "id",
          id: "target",
        },
        {
          xtype: 'numberfield',
          name: 'target_amount',
          label: 'Target Amount',
          id: "target_amount",
          value: 0
        },
        {
          xtype: 'button',
          ui: 'confirm',
          text: 'Convert',
          handler: convert
        }
      ]
    });
    
    var rates_card = new Ext.Panel({
      title: 'Rates',
      cls: 'currencies',
      layout: 'fit',
      items: [new Ext.DataView({
        store: store,
        tpl: [
          '<table>',
            '<thead>',
              '<tr class="currency header">',
                '<th><span>Name</span></th>',
                '<th><span>Abbreviation</span></th>',
                '<th><span>Symbol</span></th>',
                '<th><span>Conversion</span></th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              '<tpl for=".">',
                '<tr class="currency">',
                  '<td class="name"><span>{name}</span></td>',
                  '<td class="abbreviation"><span>{abbreviation}</span></td>',
                  '<td class="symbol"><span>{html}</span></td>',
                  '<td class="to_euro"><span>{to_euro}</span></td>',
                '</tr>',
              '</tpl>',
            '</tbody>',
          '</table>'
        ],
        autoHeight: true,
        itemSelector:'div.thumb-wrap',
        emptyText: 'No Rates to Display'
      })]
    });
    
    var panel = new Ext.TabPanel({
      fullscreen: true,
      cardAnimation: 'slide',
      items: [converter_card, rates_card]
    });
    
  }
});