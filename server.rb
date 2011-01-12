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

message_id = 20
messages = Array.new(message_id) do |i|
  id = i + 1
	{:message => "I am number #{id}", :color => colors[rand(colors.size)], :id => id}
end

# you must have this method for the restful server to work correctly
def next_messages_id
  message_id += 1
end

controllers << 'messages'



# our restful server
controllers.each do |collection|
  get "/#{collection}" do
    content_type :json
    eval(collection).to_json
  end

  get '/#{collection}"/:id' do
    content_type :json
    eval(collection)[params[:id].to_i].to_json
  end

  # not tested
  post '/#{collection}"/:id' do
    content_type :json
    id = params[:id].to_i
    collection_index = eval(collection).index{|x| x[:id] == id}
    eval(collection)[collection_index] = params
    eval(collection)[params[:id].to_i].to_json
  end

  # not tested
  put '/#{collection}"/:id' do
    content_type :json
    iteam = params
    eval(collection).update(:id => eval("next_#{collection}_id"))
  end

  delete '/#{collection}"/:id' do
    eval(collection).delete_if{|a| a[:id] == params[:id].to_i}  
    content_type :json
  end
end
