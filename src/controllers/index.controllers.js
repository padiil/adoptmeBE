import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import translate from "translate";

const prisma = new PrismaClient();

export const getpets = async (req, res) => {
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
      first: `/api/pets?page=1${
        speciesFilter ? `&species=${speciesFilter}` : ""
      }`,
      last: `/api/pets?page=${totalPages}${
        speciesFilter ? `&species=${speciesFilter}` : ""
      }`,
      prev:
        page > 1
          ? `/api/pets?page=${page - 1}${
              speciesFilter ? `&species=${speciesFilter}` : ""
            }`
          : null,
      next:
        page < totalPages
          ? `/api/pets?page=${page + 1}${
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

export const getRandomFacts = async (req, res) => {
  try {
    let fact = {};

    // Pilih secara acak antara fakta anjing atau kucing
    const randomChoice = Math.random() < 0.5 ? "dog" : "cat";

    if (randomChoice === "dog") {
      const dogFactsResponse = await fetch("https://dogapi.dog/api/v2/facts");
      const rawDogFacts = await dogFactsResponse.json();
      const dogFacts = rawDogFacts.data;
      const randomDogFact =
        dogFacts[Math.floor(Math.random() * dogFacts.length)];
      const translatedDogFact = await translate(randomDogFact.attributes.body, {
        to: "id",
      });
      fact = {
        type: "dog",
        fact: translatedDogFact,
      };
    } else {
      const catFactsResponse = await fetch(
        "https://v2.api.noroff.dev/cat-facts/random"
      );
      const rawCatFacts = await catFactsResponse.json();
      const catFact = rawCatFacts.data;
      const translatedCatFact = await translate(catFact.text, { to: "id" });
      fact = {
        type: "cat",
        fact: translatedCatFact,
      };
    }

    res.json(fact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getpetById = async (req, res) => {
  const petId = parseInt(req.params.id);

  try {
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
      include: {
        species: true,
        photos: true,
        user: true,
      },
    });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const petDetails = {
      id: pet.id,
      name: pet.name,
      description: pet.description,
      weight: pet.weight,
      species: pet.species.name,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      healthCondition: pet.healthCondition,
      location: pet.location,
      userId: pet.user.id,
      userName: pet.user.name,
      userPhone: pet.user.phone,
      userEmail: pet.user.email,
      userPhoto: pet.user.photo,
      createdAt: pet.createdAt.toISOString(),
      updatedAt: pet.updatedAt.toISOString(),
      petPhotos: pet.photos.map((photo) => ({
        id: photo.id,
        url: photo.url,
      })),
    };

    res.json(petDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};