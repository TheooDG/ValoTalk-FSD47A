<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
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
                    ]),
                ],
                'label' => 'Adresse e-mail',
            ])

            ->add('password', PasswordType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le mot de passe ne peut pas être vide.',
                    ]),
                    new Length([
                        'min'        => 6,
                        'minMessage' => 'Le mot de passe doit comporter au moins {{ limit }} caractères.',
                        'max'        => 4096,
                        'maxMessage' => 'Votre mot de passe ne peut pas dépasser {{ limit }} caractères.',
                    ]),
                    new Regex([
                        'pattern' => '/^(?=.*[0-9])(?=.*[\W_]).{6,4096}$/',
                        'message' => 'Le mot de passe doit comporter au moins 6 caractères, inclure au moins un chiffre et un caractère spécial.',
                    ]),
                ],
                'label' => 'Mot de passe',
            ])

            ->add('birthdate', DateType::class, [
                'widget'      => 'single_text',
                'html5'       => true,
                'input'       => 'datetime_immutable',
                'required'    => false,
                'constraints' => [
                    new Range([
                        'min'               => new \DateTime('1900-01-01'),
                        'max'               => new \DateTime('now'),
                        'notInRangeMessage' => sprintf(
                            'La date de naissance doit être comprise entre le %s et le %s.',
                            (new \DateTime('1900-01-01'))->format('d/m/Y'),
                            (new \DateTime('now'))->format('d/m/Y')
                        ),
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
