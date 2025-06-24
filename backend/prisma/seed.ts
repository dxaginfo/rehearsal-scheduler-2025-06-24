import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create users
  const passwordHash = await bcrypt.hash('Password123!', 10);
  
  const john = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      passwordHash,
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '555-123-4567',
    },
  });

  const jane = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      passwordHash,
      firstName: 'Jane',
      lastName: 'Smith',
      phoneNumber: '555-987-6543',
    },
  });

  const mike = await prisma.user.upsert({
    where: { email: 'mike@example.com' },
    update: {},
    create: {
      email: 'mike@example.com',
      passwordHash,
      firstName: 'Mike',
      lastName: 'Johnson',
      phoneNumber: '555-456-7890',
    },
  });

  console.log('Created users:', { john, jane, mike });

  // Create a band
  const band = await prisma.band.create({
    data: {
      name: 'The Awesome Band',
      description: 'A sample band for demonstration purposes',
      creatorId: john.id,
    },
  });

  console.log('Created band:', band);

  // Add members to the band
  const johnMember = await prisma.bandMember.create({
    data: {
      role: 'Leader',
      userId: john.id,
      bandId: band.id,
    },
  });

  const janeMember = await prisma.bandMember.create({
    data: {
      role: 'Member',
      userId: jane.id,
      bandId: band.id,
    },
  });

  const mikeMember = await prisma.bandMember.create({
    data: {
      role: 'Member',
      userId: mike.id,
      bandId: band.id,
    },
  });

  console.log('Added members to band:', { johnMember, janeMember, mikeMember });

  // Create songs
  const songs = await Promise.all([
    prisma.song.create({
      data: {
        title: 'Awesome Song 1',
        artist: 'The Awesome Band',
        duration: 180, // 3 minutes
        key: 'C Major',
        bpm: 120,
        notes: 'Our first original song',
        bandId: band.id,
        creatorId: john.id,
      },
    }),
    prisma.song.create({
      data: {
        title: 'Awesome Song 2',
        artist: 'The Awesome Band',
        duration: 240, // 4 minutes
        key: 'G Major',
        bpm: 100,
        notes: 'Our second original song',
        bandId: band.id,
        creatorId: john.id,
      },
    }),
    prisma.song.create({
      data: {
        title: 'Cover Song',
        artist: 'Famous Artist',
        duration: 210, // 3.5 minutes
        key: 'D Minor',
        bpm: 110,
        notes: 'A cover we like to play',
        bandId: band.id,
        creatorId: jane.id,
      },
    }),
  ]);

  console.log('Created songs:', songs);

  // Create a setlist
  const setlist = await prisma.setlist.create({
    data: {
      name: 'Practice Setlist',
      description: 'Songs to practice in our next rehearsal',
      bandId: band.id,
      creatorId: john.id,
    },
  });

  console.log('Created setlist:', setlist);

  // Add songs to the setlist
  const setlistItems = await Promise.all([
    prisma.setlistItem.create({
      data: {
        setlistId: setlist.id,
        songId: songs[0].id,
        order: 1,
        notes: 'Start with this one to warm up',
      },
    }),
    prisma.setlistItem.create({
      data: {
        setlistId: setlist.id,
        songId: songs[2].id,
        order: 2,
        notes: 'Focus on the bridge section',
      },
    }),
    prisma.setlistItem.create({
      data: {
        setlistId: setlist.id,
        songId: songs[1].id,
        order: 3,
        notes: 'End with this one',
      },
    }),
  ]);

  console.log('Added songs to setlist:', setlistItems);

  // Create rehearsals
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(18, 0, 0, 0);

  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(18, 0, 0, 0);

  const rehearsals = await Promise.all([
    prisma.rehearsal.create({
      data: {
        title: 'Regular Practice',
        description: 'Our weekly practice session',
        location: 'John\'s Garage',
        startTime: tomorrow,
        endTime: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
        bandId: band.id,
        creatorId: john.id,
        setlistId: setlist.id,
      },
    }),
    prisma.rehearsal.create({
      data: {
        title: 'Next Week Practice',
        description: 'Planning ahead for next week',
        location: 'John\'s Garage',
        startTime: nextWeek,
        endTime: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
        bandId: band.id,
        creatorId: john.id,
      },
    }),
  ]);

  console.log('Created rehearsals:', rehearsals);

  // Add attendance records
  const attendances = await Promise.all([
    // For tomorrow's rehearsal
    prisma.attendance.create({
      data: {
        status: 'confirmed',
        rehearsalId: rehearsals[0].id,
        memberId: johnMember.id,
        userId: john.id,
      },
    }),
    prisma.attendance.create({
      data: {
        status: 'confirmed',
        rehearsalId: rehearsals[0].id,
        memberId: janeMember.id,
        userId: jane.id,
      },
    }),
    prisma.attendance.create({
      data: {
        status: 'pending',
        rehearsalId: rehearsals[0].id,
        memberId: mikeMember.id,
        userId: mike.id,
      },
    }),
    // For next week's rehearsal
    prisma.attendance.create({
      data: {
        status: 'confirmed',
        rehearsalId: rehearsals[1].id,
        memberId: johnMember.id,
        userId: john.id,
      },
    }),
    prisma.attendance.create({
      data: {
        status: 'pending',
        rehearsalId: rehearsals[1].id,
        memberId: janeMember.id,
        userId: jane.id,
      },
    }),
    prisma.attendance.create({
      data: {
        status: 'pending',
        rehearsalId: rehearsals[1].id,
        memberId: mikeMember.id,
        userId: mike.id,
      },
    }),
  ]);

  console.log('Created attendance records:', attendances);

  // Create availability records
  const johnAvailability = await Promise.all([
    // Monday evenings
    prisma.availability.create({
      data: {
        userId: john.id,
        dayOfWeek: 1, // Monday
        startTime: '18:00',
        endTime: '22:00',
        isAvailable: true,
      },
    }),
    // Wednesday evenings
    prisma.availability.create({
      data: {
        userId: john.id,
        dayOfWeek: 3, // Wednesday
        startTime: '18:00',
        endTime: '22:00',
        isAvailable: true,
      },
    }),
    // Saturday all day
    prisma.availability.create({
      data: {
        userId: john.id,
        dayOfWeek: 6, // Saturday
        startTime: '10:00',
        endTime: '22:00',
        isAvailable: true,
      },
    }),
  ]);

  const janeAvailability = await Promise.all([
    // Tuesday evenings
    prisma.availability.create({
      data: {
        userId: jane.id,
        dayOfWeek: 2, // Tuesday
        startTime: '18:00',
        endTime: '22:00',
        isAvailable: true,
      },
    }),
    // Thursday evenings
    prisma.availability.create({
      data: {
        userId: jane.id,
        dayOfWeek: 4, // Thursday
        startTime: '18:00',
        endTime: '22:00',
        isAvailable: true,
      },
    }),
    // Saturday afternoons
    prisma.availability.create({
      data: {
        userId: jane.id,
        dayOfWeek: 6, // Saturday
        startTime: '12:00',
        endTime: '18:00',
        isAvailable: true,
      },
    }),
  ]);

  const mikeAvailability = await Promise.all([
    // Monday evenings
    prisma.availability.create({
      data: {
        userId: mike.id,
        dayOfWeek: 1, // Monday
        startTime: '19:00',
        endTime: '23:00',
        isAvailable: true,
      },
    }),
    // Wednesday evenings
    prisma.availability.create({
      data: {
        userId: mike.id,
        dayOfWeek: 3, // Wednesday
        startTime: '19:00',
        endTime: '23:00',
        isAvailable: true,
      },
    }),
    // Saturday evenings
    prisma.availability.create({
      data: {
        userId: mike.id,
        dayOfWeek: 6, // Saturday
        startTime: '16:00',
        endTime: '23:00',
        isAvailable: true,
      },
    }),
  ]);

  console.log('Created availability records:', {
    johnAvailability,
    janeAvailability,
    mikeAvailability,
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });