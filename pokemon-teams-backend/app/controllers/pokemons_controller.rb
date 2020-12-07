class PokemonsController < ApplicationController
  before_action :set_trainer, only: :create

  def create
    @pokemon = Pokemon.create(
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name,
      trainer_id: @trainer.id
    )

    render json: @pokemon, status: :created, location: @pokemon
  end

  def destroy
    @pokemon = Pokemon.find(params[:id])

    @pokemon.destroy
  end

  private

  def set_trainer
    @trainer = Trainer.find(params[:trainer_id])
  end
end
