import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();

    // Ensure tripDate is valid
    const reservationDate = new Date(data.tripDate);
    if (isNaN(reservationDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid reservation date" },
        { status: 400 }
      );
    }

    const newReservation = await prisma.reservations.create({
      data: {
        trip_id: data.tripId,
        name: data.name,
        quantity: data.quantity,
        phone: data.phone,
        email: data.email,
        date: reservationDate,
        remarque: data.remarque,
        options: JSON.stringify(data.selectedOptions),
      },
    });

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}
