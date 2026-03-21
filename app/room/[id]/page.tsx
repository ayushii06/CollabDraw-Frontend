import RoomForm from "../../components/room/RoomForm"

export default function JoinRoomPage({
  params,
}: {
  params: { id: string }
}) {
  return <RoomForm mode="join" id={params.id} />
}