#!/usr/bin/env ruby 

require 'rubygems'
require 'sinatra'
require 'json'

set :public, File.dirname(__FILE__) + '/static'

colors = %w{red green blue}

data = Array.new(20) do |i|
  id = i + 1
	{:message => "I am number #{id}", :color => colors[rand(colors.size)], :id => id}
end

get '/messages' do
	content_type :json
	data.to_json
end

get '/messages/:id' do
	content_type :json
	data[params[:id].to_i].to_json
end

post '/messages/:id' do
  puts 'post request' 
  content_type :json
	data[params[:id].to_i].to_json
end

delete '/messages/:id' do
  data.delete_if{|a| a[:id] == params[:id].to_i}  
  content_type :json
end
