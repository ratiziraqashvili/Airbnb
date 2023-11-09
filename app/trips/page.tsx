import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservation = await getReservations({
    userId: currentUser.id,
  });

  if (getReservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserverd any trips"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
        <TripsClient reservations={reservation} currentUser={currentUser} />
    </ClientOnly>
  )
};

export default TripsPage;
