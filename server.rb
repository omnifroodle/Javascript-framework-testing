#!/usr/bin/env ruby 

require 'rubygems'
require 'sinatra'
require 'json'

set :public, File.dirname(__FILE__) + '/static'
controllers = []

#
# messages
#

colors = %w{red green blue}

messages = Array.new(20) do |i|
  id = i + 1
	{:message => "I am number #{id}", :color => colors[rand(colors.size)], :id => id}
end

# you must have this method for the restful server to work correctly
def next_messages_id
  messages.max{|a,b| a[:id] <=> b[:id]}[:id] + 1
end

controllers << 'messages'

#
# currencies
#

currencies = [
  {
    :id => 1, 
    :name => 'European Euro', 
    :abbreviation => 'EURO', 
    :html => '&#8354', 
    :to_euro => 1.0
  },
  {
    :id => 2, 
    :name => 'United States Dollar', 
    :abbreviation => 'USD', 
    :html => '&#36', 
    :to_euro => 0.7711
  },
  {
    :id => 3, 
    :name => 'British Pounds Sterling', 
    :abbreviation => 'GBP', 
    :html => '&#163', 
    :to_euro => 1.2030
  },
  {
    :id => 4, 
    :name => 'Japanese Yen', 
    :abbreviation => 'YEN', 
    :html => '&#xA4', 
    :to_euro => 0.00925129154
  },
  {
    :id => 5, 
    :name => 'Turkish Lira', 
    :abbreviation => 'TRY', 
    :html => '&#x20A4', 
    :to_euro => 0.4886
  }
]

def next_currency_id
  currencies.max{|a,b| a[:id] <=> b[:id]}[:id] + 1
end

controllers << 'currencies'


# our restful server
controllers.each do |collection|
  get "/#{collection}" do
    content_type :json
    eval(collection).to_json
  end

  get "/#{collection}/:id" do
    content_type :json
    eval(collection)[params[:id].to_i].to_json
  end

  # not tested
  post "/#{collection}/:id" do
    content_type :json
    id = params[:id].to_i
    collection_index = eval(collection).index{|x| x[:id] == id}
    eval(collection)[collection_index] = params
    eval(collection)[params[:id].to_i].to_json
  end

  # not tested
  put "/#{collection}" do
    content_type :json
    iteam = params
    eval(collection).update(:id => eval("next_#{collection}_id"))
  end

  delete "/#{collection}/:id" do
    eval(collection).delete_if{|a| a[:id] == params[:id].to_i}  
    content_type :json
  end
end
