<?php

namespace App\Form;

use App\Entity\Agent;
use App\Entity\Article;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class ArticleForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le titre ne peut pas être vide.',
                    ]),
                    new Length([
                        'max' => 255,
                        'maxMessage' => 'Votre titre ne peut pas faire plus de {{ limit }} caractères.',
                    ]),
                ],
                'label' => 'Titre',
            ])
            ->add('content', TextareaType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'Le contenu ne peut pas être vide.',
                    ]),
                    new Length([
                        'max' => 5000,
                        'maxMessage' => 'Votre article ne peut pas faire plus de {{ limit }} caractères.',
                    ]),
                ],
                'label' => 'Contenu',
            ])
            ->add('agent', EntityType::class, [
                'class'        => Agent::class,
                'choice_label' => 'name',
                'label'        => 'Agent',
                'placeholder'  => 'Sélectionnez un agent',
                'required'     => false,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Article::class,
        ]);
    }
}