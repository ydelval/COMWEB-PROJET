-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 22 avr. 2025 à 12:07
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_notes`
--

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`id`, `nom`) VALUES
(1, 'Groupe 1A'),
(2, 'Groupe 1B');

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

CREATE TABLE `matieres` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `matieres`
--

INSERT INTO `matieres` (`id`, `nom`) VALUES
(1, 'Maths'),
(2, 'Communication Web'),
(3, 'Programmation Avancée');

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `eleve_id` int(11) DEFAULT NULL,
  `matiere_id` int(11) DEFAULT NULL,
  `note` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id`, `eleve_id`, `matiere_id`, `note`) VALUES
(1, 1, 1, 15.5),
(2, 2, 1, 9),
(3, 3, 1, 12),
(4, 4, 2, 14.5),
(5, 5, 2, 16),
(6, 6, 2, 13.5),
(7, 1, 3, 18),
(8, 3, 3, 14.5),
(9, 5, 3, 17.5);

-- --------------------------------------------------------

--
-- Structure de la table `prof_matiere`
--

CREATE TABLE `prof_matiere` (
  `id` int(11) NOT NULL,
  `prof_id` int(11) DEFAULT NULL,
  `matiere_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `prof_matiere`
--

INSERT INTO `prof_matiere` (`id`, `prof_id`, `matiere_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `nom_complet` varchar(100) DEFAULT NULL,
  `role` enum('eleve','professeur') DEFAULT NULL,
  `classe_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `username`, `mdp`, `nom_complet`, `role`, `classe_id`) VALUES
(1, 'profmath', 'hash_mdp1', 'Marie Curie', 'professeur', NULL),
(2, 'profcomweb', 'hash_mdp2', 'Jean Dupont', 'professeur', NULL),
(3, 'profprog', 'hash_mdp3', 'Alice Martin', 'professeur', NULL),
(4, 'eleve1', 'hash_mdp4', 'Alice Dupont', 'eleve', 1),
(5, 'eleve2', 'hash_mdp5', 'Bob Martin', 'eleve', 1),
(6, 'eleve3', 'hash_mdp6', 'Claire Petit', 'eleve', 1),
(7, 'eleve4', 'hash_mdp7', 'David Lefevre', 'eleve', 2),
(8, 'eleve5', 'hash_mdp8', 'Emma Lemoine', 'eleve', 2),
(9, 'eleve6', 'hash_mdp9', 'Lucas Trin', 'eleve', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eleve_id` (`eleve_id`),
  ADD KEY `matiere_id` (`matiere_id`);

--
-- Index pour la table `prof_matiere`
--
ALTER TABLE `prof_matiere`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prof_id` (`prof_id`),
  ADD KEY `matiere_id` (`matiere_id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `classe_id` (`classe_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `prof_matiere`
--
ALTER TABLE `prof_matiere`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`eleve_id`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`matiere_id`) REFERENCES `matieres` (`id`);

--
-- Contraintes pour la table `prof_matiere`
--
ALTER TABLE `prof_matiere`
  ADD CONSTRAINT `prof_matiere_ibfk_1` FOREIGN KEY (`prof_id`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `prof_matiere_ibfk_2` FOREIGN KEY (`matiere_id`) REFERENCES `matieres` (`id`);

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`classe_id`) REFERENCES `classes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
