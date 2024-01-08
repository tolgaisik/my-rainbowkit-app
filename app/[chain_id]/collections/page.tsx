export default function page(props: any) {
  return <div>
    <h1>Collections</h1>
    {JSON.stringify(props, null, 2)}
  </div>
}
