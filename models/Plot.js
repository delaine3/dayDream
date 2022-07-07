import mongoose from 'mongoose'


/* CharacterSchema will correspond to a collection in your MongoDB database. */
const PlotSchema = new mongoose.Schema({
    plot_idea: {

    type: Array,
  },
  plot: {

    type: String,
  },
  plot_setting: {
    type: String,
  }



})

export default mongoose.models.Plot || mongoose.model('Plot', PlotSchema)
