import RoomForm from "../../components/room/RoomForm"

export default async function JoinRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;
  return <RoomForm mode="join" id={id} />
}