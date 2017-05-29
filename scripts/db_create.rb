require 'json'

all_configs = JSON.parse(IO.read('./db/config.json'))

config = ENV['ENVIRONMENT'] == 'test' ? all_configs["test"] : all_configs["development"]

puts "Using db config: #{config.inspect}"

puts "DATABASE: #{config["database"]}"

if `psql -c "SELECT 1 from pg_database WHERE datname='#{config["database"]}'" | grep 1`.empty?
  query = %Q(
    CREATE DATABASE #{config["database"]} OWNER #{config["username"]};
  )
  command = %Q(psql -c "#{query}")
  abort("Failed to Create the database") unless system(command)
else
  puts "Skipping: Already exists."
end
