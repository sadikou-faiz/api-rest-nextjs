import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// LIRE
export async function GET(request: Request) {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}

// AJOUTER
// AJOUTER
export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, position } = await request.json();

    // Vérifier que l'email est une chaîne de caractères valide
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required and must be a string' }, { status: 400 });
    }

    // Créer un nouvel employé avec Prisma
    const newEmployee = await prisma.employee.create({
      data: { firstName, lastName, email, position },
    });

    // Retourner la réponse avec le nouvel employé créé
    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error('Failed to create employee:', error);
    // Retourner une réponse d'erreur avec un statut 500 en cas d'échec
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
  }
}


// MODIFIER
export async function PATCH(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 });
  }
}

// SUPPRIMER
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }
    const deletedEmployee = await prisma.employee.delete({
      where: { id },
    });
    return NextResponse.json(deletedEmployee, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 });
  }
}
