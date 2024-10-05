<?php

namespace App\Form;

use App\Entity\User;
use Doctrine\DBAL\Types\DateType;
use Doctrine\DBAL\Types\TextType;
use MongoDB\BSON\Regex;
use PHPUnit\Util\Type;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;

class RegistrationForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class, [
                'constraints' => [
                    new NotBlank(),
                    new Length(['max' => 20]),
                    new Regex([
                        'pattern' => '/^[a-zA-Z0-9_]+$/',
                        'message' => 'Le nom d\'utilisateur ne peut contenir que des lettres, des chiffres et underscores.',
                    ]),
                ],
                'label' => 'Nom d\'utilisateur',
            ])

            ->add('email', EmailType::class, [
                'constraints' => [
                    new NotBlank(),
                ],
                'label' => 'Adresse e-mail',
            ])
            ->add('password', PasswordType::class, [
                'constraints' => [
                    new NotBlank(),
                    new Length(['min' => 6]),
                ],
                'label' => 'Mot de passe',
            ])

            ->add('birthdate', DateType::class, [
                'constraints' => [
                    new Type(\DateTime::class),
                    new Range([
                        'min'               => new \DateTime('1900-01-01'),
                        'max'               => new \DateTime('now'),
                        'notInRangeMessage' => 'La date de naissance doit être entre {{ min }} et {{ max }}.',
                    ]),
                ],
            ])

            ->add('submit', SubmitType::class, [
                'label' => 'Créer un compte',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
