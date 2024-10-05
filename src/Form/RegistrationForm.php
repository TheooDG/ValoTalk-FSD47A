<?php

namespace App\Form;

use App\Entity\User;
use PHPUnit\Util\Type;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;
use Symfony\Component\Validator\Constraints\Regex;

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
                    new NotBlank([
                        'message' => 'L\'adresse e-mail ne peut pas être vide.',
                    ]),
                    new Email([
                        'message' => 'Veuillez entrer une adresse e-mail valide.',
                    ])
                ],
                'label' => 'Adresse e-mail',
            ])
            ->add('password', PasswordType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le mot de passe ne peut pas être vide.',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Le mot de passe doit comporter au moins {{ min }} caractères.',
                        'max' => 4096,
                        'maxMessage' => 'Votre mot de passe ne peut pas dépasser {{ max }} caractères.',
                    ]),
                ],
                'label' => 'Mot de passe',
            ])

            ->add('birthdate', DateType::class, [
                'constraints' => [
                    new Range([
                        'min'               => new \DateTime('1900-01-01'),
                        'max'               => new \DateTime('now'),
                        'notInRangeMessage' => 'La date de naissance doit comprise être entre {{ min }} et {{ max }}.',
                    ]),
                ],
                'label' => 'Date de naissance',
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
