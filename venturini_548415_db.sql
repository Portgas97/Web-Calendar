-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2021 at 11:58 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `venturini_548415_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE IF NOT EXISTS `accounts` (
`id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `e-mail` varchar(100) NOT NULL,
  `telephone` bigint(11) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `name`, `surname`, `e-mail`, `telephone`, `birthday`, `username`, `password`) VALUES
(2, 'Francesco', 'Venturini', 'f.venturini12@studenti.unipi.it', 3496853329, '1997-03-24', 'fraventu97', '$2y$10$87gXZrDwCz9fsMthUOy0cOLiEdtiU9Tk/9UZIfLIaKW8usp2zhRLq'),
(5, 'pippo', 'pippo', 'pippo@pippo.it', NULL, NULL, 'pippo', '$2y$10$EIFMNFEAC1D68P/TGFvQ0uNc62058xmW.7KMQkJ6LbsQjwldm4.Jy'),
(11, 'ciao', 'ciao', 'ciao@ciao.it', 0, NULL, 'ciao', '$2y$10$w9Pbv3GffMmkb2ot8hEaLO3kdb427VUA.VJcV.RVpxMZpN8BAxDaS'),
(12, 'nome', 'cognome', 'nome@cognome.it', 3336853329, NULL, 'superuser', '$2y$10$euJZZVcuW4kzntDh1IILDeZWjVwyLnfFnLCW/wFLlnhJE/hNPkHzO'),
(13, 'vittoria', 'rossi', 'vovi011298@hotmail.it', 3665338693, NULL, 'Vitti', '$2y$10$7degd9b61m6sHjdZeZKlsuiulGlMbgm6f1kCUzzvzLJXwJ.CuE1Pq'),
(14, 'Virginia', 'Torelli', 'mavi.virgi@hotmail.it', 3664811478, NULL, 'virgimiao', '$2y$10$1j3o1EvDI275GEnuTLapZOu88U6zuIU7OUQNUHAsr4Ci/.tEmhQLG'),
(18, 'nome', 'cognome', 'nome@cognome.it', 0, NULL, 'username', '$2y$10$EJFiX.1D5Iy/fQawWHecMeqMs/S5xw6/J/Th.sd7lDYgpVWDufPHa'),
(20, 'utente', 'cognome_utente', 'mail@caselle.dom', 33366677765, '2000-04-07', 'nomeacaso', '$2y$10$1Bx7knsVHxejSuIFGIpH4.IkOCD7x8rx8i6OxxChe6m6P/0d/U3Ju');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
`id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `when` date NOT NULL,
  `description` text
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=201 ;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `username`, `when`, `description`) VALUES
(1, 'fraventu97', '2021-03-20', 'Descrizione dell''evento in programma'),
(19, 'fraventu97', '2021-06-24', 'Descrizione Importante'),
(66, 'fraventu97', '2021-03-27', 'Ok prova'),
(80, 'fraventu97', '2021-03-29', 'Modifica della descrizione'),
(84, 'pippo', '2021-02-21', 'Ok'),
(85, 'pippo', '2021-04-21', 'Ok'),
(89, 'pippo', '2021-04-05', 'nuovo evento'),
(90, 'pippo', '2021-03-31', 'marzo'),
(91, 'pippo', '2021-03-31', 'marzo ancora'),
(92, 'pippo', '2021-03-01', 'primo marzo'),
(93, 'pippo', '0000-00-00', '31 aprile'),
(94, 'pippo', '2021-04-30', '30 aprile'),
(95, 'pippo', '2021-04-30', 'ancora 30 aprile'),
(97, 'fraventu97', '2021-04-01', 'evento in programma'),
(99, 'fraventu97', '2021-03-31', '31 marzo'),
(101, 'fraventu97', '2021-05-01', '1 maggio'),
(102, 'pitonegrosso', '2021-04-28', 'vaccino covid'),
(104, 'pitonegrosso', '2021-06-01', 'esame di chirurgia orale'),
(105, 'username_default', '2021-12-25', 'Natale 2021'),
(106, 'username_default', '2021-04-04', 'Pasqua 2021'),
(109, 'username_default', '2026-12-25', 'Natale 2026'),
(110, 'username_default', '2022-12-25', 'Natale 2022'),
(111, 'username_default', '2023-12-25', 'Natale 2023'),
(112, 'username_default', '2024-12-25', 'Natale 2024'),
(113, 'username_default', '2025-12-25', 'Natale 2025'),
(114, 'username_default', '2020-12-25', 'Natale 2020'),
(115, 'username_default', '2019-12-25', 'Natale 2019'),
(116, 'username_default', '2018-12-25', 'Natale 2018'),
(117, 'username_default', '2017-12-25', 'Natale 2017'),
(118, 'username_default', '2016-12-25', 'Natale 2016'),
(119, 'username_default', '2022-04-17', 'Pasqua 2022'),
(120, 'username_default', '2023-04-09', 'Pasqua 2023'),
(121, 'username_default', '2024-03-31', 'Pasqua 2024'),
(122, 'username_default', '2025-04-20', 'Pasqua 2025'),
(123, 'username_default', '2019-04-21', 'Pasqua 2019'),
(124, 'username_default', '2020-04-12', 'Pasqua 2020'),
(125, 'username_default', '2018-04-01', 'Pasqua 2018'),
(126, 'username_default', '2017-04-16', 'Pasqua 2017'),
(127, 'username_default', '2016-03-27', 'Pasqua 2016'),
(128, 'username_default', '2015-04-05', 'Pasqua 2015'),
(129, 'username_default', '2031-04-13', 'Pasqua 2031'),
(130, 'username_default', '2014-04-20', 'Pasqua 2014'),
(131, 'username_default', '2013-03-31', 'Pasqua 2013'),
(132, 'username_default', '2012-04-08', 'Pasqua 2012'),
(133, 'username_default', '2011-04-24', 'Pasqua 2011'),
(134, 'username_default', '0000-00-00', 'Pasqua 2026'),
(135, 'username_default', '0000-00-00', 'Pasqua 2027'),
(136, 'username_default', '0000-00-00', 'Pasqua 2028'),
(137, 'username_default', '0000-00-00', 'Pasqua 2029'),
(138, 'username_default', '0000-00-00', '2030'),
(139, 'username_default', '2026-04-05', 'Pasqua 2026'),
(140, 'username_default', '2027-03-28', 'Pasqua 2027'),
(141, 'username_default', '2028-04-16', 'Pasqua 2028'),
(142, 'username_default', '2029-04-01', 'Pasqua 2029'),
(143, 'username_default', '2030-04-21', 'Pasqua 2030'),
(144, 'username_default', '2020-12-25', 'Natale 2020'),
(145, 'username_default', '2019-12-25', 'Natale 2019'),
(146, 'username_default', '2018-12-25', 'Natale 2018'),
(147, 'username_default', '2017-12-25', 'Natale 2017'),
(148, 'username_default', '2016-12-25', 'Natale 2016'),
(149, 'username_default', '2015-12-25', 'Natale 2015'),
(150, 'username_default', '2014-12-25', 'Natale 2014'),
(151, 'username_default', '2013-12-25', 'Natale 2013'),
(152, 'username_default', '2012-12-25', 'Natale 2012'),
(153, 'username_default', '2011-12-25', 'Natale 2011'),
(154, 'pippo', '2021-03-01', 'primo marzo'),
(155, 'pippo', '2021-04-01', 'primo aprile'),
(156, 'pippo', '2021-03-01', 'primo aprile'),
(157, 'pippo', '2021-04-01', 'pesce d aprile'),
(158, 'pippo', '2021-03-01', 'ok ok ok'),
(159, 'pippo', '2021-04-03', 'Dentista'),
(160, 'pippo', '2021-03-03', 'marzo non aprile'),
(161, 'pippo', '2021-05-03', 'aprile non maggio'),
(162, 'username_default', '2021-04-25', 'Anniversario della Liberazione'),
(163, 'username_default', '2021-05-01', 'Festa del Lavoro'),
(164, 'username_default', '2021-06-02', 'Fondazione della Repubblica'),
(165, 'username_default', '2021-01-01', 'Capodanno'),
(166, 'username_default', '2021-01-06', 'Epifania'),
(167, 'username_default', '2021-04-05', 'Pasquetta'),
(169, 'username_default', '2021-08-15', 'Assunzione della Beata Vergine (Ferragosto)'),
(170, 'username_default', '2021-11-01', 'Ognissanti'),
(171, 'username_default', '2021-12-08', 'Immacolata Concezione'),
(172, 'username_default', '2021-12-26', 'Santo Stefano'),
(173, 'pippo', '2021-03-02', 'Ocaml'),
(174, 'pippo', '2021-04-02', 'ocaml'),
(175, 'pippo', '2021-03-02', '2 marzo'),
(187, 'nomeacaso', '2021-04-17', 'Promemoria Riunione'),
(189, 'nomeacaso', '2021-04-02', 'Cena Aziendale'),
(190, 'nomeacaso', '2021-04-06', 'Meeting'),
(191, 'fraventu97', '2021-04-04', 'Consegna Progetto PWEB'),
(192, 'fraventu97', '2021-04-07', 'Esame PWEB'),
(194, 'fraventu97', '2021-04-08', 'Dentista'),
(195, 'fraventu97', '2021-04-10', 'Fare attivitÃ  fisica'),
(196, 'pippo', '2021-04-23', 'Anniversario'),
(197, 'fraventu97', '2021-04-08', 'Seguire Lezioni !!'),
(198, 'pippo', '2021-04-07', 'Esame PWEB');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=201;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
