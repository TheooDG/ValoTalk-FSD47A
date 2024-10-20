<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\Entity\User;

class ChangePasswordForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('currentPassword', PasswordType::class, [
                'label'       => 'Mot de passe actuel',
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            ->add('plainPassword', PasswordType::class, [
                'label'       => 'Nouveau mot de passe',
                'constraints' => [
                    new NotBlank(),
                    new Length(['min' => 8]), // Par exemple, minimum 8 caractères
                ],
            ])
            ->add('submit', SubmitType::class, ['label' => 'Changer le mot de passe']);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([]);
    }
}
