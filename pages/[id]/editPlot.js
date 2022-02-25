import { useRouter } from 'next/router'
import useSWR from 'swr'
import PlotForm from '../../components/PlotForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditPlot = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: writingExcercise, error } = useSWR(id ? `/api/plot/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!writingExcercise) return <p>Loading...</p>
  const plotForm = {
    plot_idea:   writingExcercise.plot_idea,
    plot: writingExcercise.plot

  }

  return <PlotForm formId="edit-character-form" plotForm={plotForm} forNewPlot={false} />
}

export default EditPlot
