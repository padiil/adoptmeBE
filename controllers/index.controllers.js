import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAnimals = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const speciesFilter = req.query.species || null;

  // hitung jumlah data yang akan dilewati untuk pagination
  const skip = (page - 1) * limit;

  try {
    const where = speciesFilter ? { species: { name: speciesFilter } } : {};

    const total = await prisma.pet.count({ where });
    const pets = await prisma.pet.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: "desc", // Urutkan berdasarkan createdAt dalam urutan terbaru
      },
      where,
      include: {
        species: true,
        photos: true,
        _count: {
          select: { favoritePets: true },
        },
      },
    });

    // hitung jumlah halaman dengan rumus pembulatan ke atas
    const totalPages = Math.ceil(total / limit);

    const formattedPets = pets.map((pet) => ({
      id: pet.id,
      name: pet.name,
      location: pet.location,
      favoriteCount: pet._count.favoritePets,
      petPhotos: pet.photos.map((photo) => photo.url),
      createdAt: pet.createdAt.toISOString(),
    }));

    // link untuk pagination
    const links = {
      first: `/api/animals?page=1${
        speciesFilter ? `&species=${speciesFilter}` : ""
      }`,
      last: `/api/animals?page=${totalPages}${
        speciesFilter ? `&species=${speciesFilter}` : ""
      }`,
      prev:
        page > 1
          ? `/api/animals?page=${page - 1}${
              speciesFilter ? `&species=${speciesFilter}` : ""
            }`
          : null,
      next:
        page < totalPages
          ? `/api/animals?page=${page + 1}${
              speciesFilter ? `&species=${speciesFilter}` : ""
            }`
          : null,
    };

    res.json({
      data: formattedPets,
      meta: {
        total: total,
        perPage: limit,
        currentPage: page,
        totalPages: totalPages,
      },
      links: links,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
