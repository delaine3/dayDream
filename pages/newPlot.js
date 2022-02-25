import PlotForm from '../components/PlotForm'

const NewPlotForm = () => {
  const plot = {
    plot:"",
    plot_idea:""
  }

  return <PlotForm formId="add-plot-form" plotForm={plot} />
}

export default NewPlotForm
