require 'faker'
require 'securerandom'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Trainer.delete_all
Pokemon.delete_all

trainers_name = [
  'Natalie',
  'Prince',
  'Dick',
  'Rachel',
  'Garry',
  'Jason',
  'Matt',
  'Niky',
  'Ashley'
]

trainers_name
  .map { |name| Trainer.create(name: name) }
  .each do |trainer|
    team_size = (SecureRandom.random_number(6) + 1).floor

    (1..team_size).each do
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    end
  end
