import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '5d34971e44524e628826408febdcf2dc'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '2251b3d4e54b4bac953aa1e22f9d6415'
                    }
                    todo_app_menu: {
                        table: 'sys_app_application'
                        id: '0746a9d7384b44c6a47a4678af548cfc'
                    }
                    todo_app_module: {
                        table: 'sys_app_module'
                        id: '600f00c097d14363b94d3eec781ed677'
                    }
                    todo_saved_filter_create_admin_acl: {
                        table: 'sys_security_acl'
                        id: '56652158ac3b4b07aaa27a5a6a9a0355'
                    }
                    todo_saved_filter_create_owner_acl: {
                        table: 'sys_security_acl'
                        id: 'ef3d483e80904f63940f111cc67934ea'
                    }
                    todo_saved_filter_delete_admin_acl: {
                        table: 'sys_security_acl'
                        id: '5451ecc88d9a4cd9baaea7308a17ae06'
                    }
                    todo_saved_filter_delete_owner_acl: {
                        table: 'sys_security_acl'
                        id: '214a121d7051441aa112d3151cf1f41f'
                    }
                    todo_saved_filter_normalize_before_save: {
                        table: 'sys_script'
                        id: '194976aea7c54d71ace314097322813d'
                    }
                    todo_saved_filter_read_admin_acl: {
                        table: 'sys_security_acl'
                        id: 'fe9f9502aa34431e888b703b76b9ef81'
                    }
                    todo_saved_filter_read_owner_acl: {
                        table: 'sys_security_acl'
                        id: 'b718aa10d909451fb7d125f545ab0a73'
                    }
                    todo_saved_filter_write_admin_acl: {
                        table: 'sys_security_acl'
                        id: '49cd0334e31441008efce61bee620e23'
                    }
                    todo_saved_filter_write_owner_acl: {
                        table: 'sys_security_acl'
                        id: '7e5dfce6298e4d53904e56352ce31ee0'
                    }
                    todo_tag_create_admin_acl: {
                        table: 'sys_security_acl'
                        id: 'dc9aeeb1ea5a4f4fb753b8a17edd647e'
                    }
                    todo_tag_create_owner_acl: {
                        table: 'sys_security_acl'
                        id: '88cc25a4d6564695bd9fcc901ffdae34'
                    }
                    todo_tag_delete_admin_acl: {
                        table: 'sys_security_acl'
                        id: 'b4165ff9acfd4c59ad8ba5ce398512c5'
                    }
                    todo_tag_delete_owner_acl: {
                        table: 'sys_security_acl'
                        id: '600dae07a61a4627afd8bd6ecb5d68ce'
                    }
                    todo_tag_normalize_before_save: {
                        table: 'sys_script'
                        id: 'a3a06a23b0e84096857c9047be9840c1'
                    }
                    todo_tag_read_admin_acl: {
                        table: 'sys_security_acl'
                        id: '27b821e9613747d3b9d1477e278e28b2'
                    }
                    todo_tag_read_owner_acl: {
                        table: 'sys_security_acl'
                        id: 'bedd67c538b4478cb48385716a420395'
                    }
                    todo_tag_write_admin_acl: {
                        table: 'sys_security_acl'
                        id: 'd5ec120119024893b9c498b4f90e6dd2'
                    }
                    todo_tag_write_owner_acl: {
                        table: 'sys_security_acl'
                        id: '79a61f81b2194b11a6dfce2fcbc21639'
                    }
                    todo_task_create_admin_acl: {
                        table: 'sys_security_acl'
                        id: '766f81657a454e37bb2d46e71d11396a'
                    }
                    todo_task_create_owner_acl: {
                        table: 'sys_security_acl'
                        id: '2e44b2cb22a746a5a287b6041f610cba'
                    }
                    todo_task_delete_admin_acl: {
                        table: 'sys_security_acl'
                        id: 'af6b5641da2540f6bb25efe0fe44a12e'
                    }
                    todo_task_delete_owner_acl: {
                        table: 'sys_security_acl'
                        id: 'fbf0d16704314379bcb3c5290c3a087f'
                    }
                    todo_task_normalize_before_save: {
                        table: 'sys_script'
                        id: 'f582d37369154ee88efe7824545207ca'
                    }
                    todo_task_read_admin_acl: {
                        table: 'sys_security_acl'
                        id: 'acf2852b5e374bbfae590ccada54c6f7'
                    }
                    todo_task_read_owner_acl: {
                        table: 'sys_security_acl'
                        id: '65e3431904af4e40936d089189fc29e4'
                    }
                    todo_task_tag_create_admin_acl: {
                        table: 'sys_security_acl'
                        id: '97e73603735342089f2be5519ffc3610'
                    }
                    todo_task_tag_create_owner_acl: {
                        table: 'sys_security_acl'
                        id: 'dcec9c17924b4114a8432245205f473a'
                    }
                    todo_task_tag_delete_admin_acl: {
                        table: 'sys_security_acl'
                        id: '0f97fd371f9c4f13952eccba06fc374d'
                    }
                    todo_task_tag_delete_owner_acl: {
                        table: 'sys_security_acl'
                        id: '0b600e2a8c3249cb8eb71fdede15dd1c'
                    }
                    todo_task_tag_normalize_before_save: {
                        table: 'sys_script'
                        id: '18404462c1fb4731b14cfff4e53bc9b2'
                    }
                    todo_task_tag_read_admin_acl: {
                        table: 'sys_security_acl'
                        id: '2f18404c6f134c46bb7434a87a718126'
                    }
                    todo_task_tag_read_owner_acl: {
                        table: 'sys_security_acl'
                        id: '4bccbdccc628463b852e816c247d930c'
                    }
                    todo_task_tag_write_admin_acl: {
                        table: 'sys_security_acl'
                        id: '32e4047a2ac047df80799994d698874c'
                    }
                    todo_task_tag_write_owner_acl: {
                        table: 'sys_security_acl'
                        id: 'a7ee5978410049cea5cd70536a53abb2'
                    }
                    todo_task_write_admin_acl: {
                        table: 'sys_security_acl'
                        id: '1430945d709a42b9bc2fd4948e49ab9e'
                    }
                    todo_task_write_owner_acl: {
                        table: 'sys_security_acl'
                        id: 'bc3f87ccb8904a11944ce9ec39c59497'
                    }
                }
                composite: [
                    {
                        table: 'sys_security_acl_role'
                        id: '00f0e6693db040babf1b73b540f90ee2'
                        key: {
                            sys_security_acl: 'a7ee5978410049cea5cd70536a53abb2'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '03759791914842069b954781c499dd24'
                        key: {
                            name: 'x_2063979_todo/main'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '03ccdad2abf9478fa53571b83be54fb5'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'reminder_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '069457f453444d72979e9556b0d88561'
                        key: {
                            name: 'x_2063979_todo_saved_filter'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '08d598fd80024ace9b0737e74f1b197d'
                        key: {
                            name: 'x_2063979_todo_task_tag'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0f8d8f39659a40cd89e68aca64f4593f'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '190dfab945ea4a07ad6b36534197bdc9'
                        key: {
                            name: 'x_2063979_todo_task_tag'
                            element: 'owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1e712606dc0f493294ababf6fcaf4394'
                        key: {
                            sys_security_acl: '65e3431904af4e40936d089189fc29e4'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '228df8b11c76491b96507259139c91a2'
                        key: {
                            name: 'x_2063979_todo_tag'
                            element: 'owner'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '22dee5e0a5ed4f1c84f6d108dccaf954'
                        key: {
                            sys_security_acl: '88cc25a4d6564695bd9fcc901ffdae34'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '26314482425a47ee8af89154b5c6992b'
                        key: {
                            name: 'x_2063979_todo_task_tag'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2855ad25d1aa475396ba59caf11914b4'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '2a28f06097244f7fbff8194874da5127'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2a40543ed0124eb591638b2240ba3cdf'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'priority'
                            value: 'urgent'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2d1dde1b436e4a5686ef524b510ea7cf'
                        key: {
                            sys_security_acl: '214a121d7051441aa112d3151cf1f41f'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2def659654e74a1795a9c7aef96596e8'
                        key: {
                            sys_security_acl: '79a61f81b2194b11a6dfce2fcbc21639'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2e8110e8ac1e468191abe309aa343880'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'recurrence'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '33edcab109524815b5eda8240dad816a'
                        key: {
                            name: 'x_2063979_todo.admin'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '37da26b62aa740ddb20ee54337e3eb1e'
                        key: {
                            name: 'x_2063979_todo_saved_filter'
                            element: 'owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '38844ac65e584bf1a9504b6f762e615b'
                        key: {
                            name: 'x_2063979_todo_task_tag'
                            element: 'tag'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '38cf6ba3cff24a8cabd9deb2f3dd2e03'
                        key: {
                            sys_security_acl: 'bedd67c538b4478cb48385716a420395'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3c2d267e72ef41d59f92f1f56cdc02bb'
                        key: {
                            sys_security_acl: '56652158ac3b4b07aaa27a5a6a9a0355'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3e1b6649ef174ba4b8c9b20ab8283b0f'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3ebef181bfc242b2b390e2261101bde4'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'status'
                            value: 'active'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3f75a8165cf24646a917f73af0164ba7'
                        key: {
                            name: 'x_2063979_todo_tag'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4234c78950eb4ac7ab46b7820ed8d7f7'
                        key: {
                            name: 'x_2063979_todo_tag'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '42e9eeb80e9041ff8f2b456c76ecabe2'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'completed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '431ceacbed3349f0b88f253bf093379c'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '436cc8e9639e4b39bb00188786bfb232'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'completed_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '492796de2e934c5aad1c2f8ad1960db0'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'due_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '49c89500d9f14f529f7016884382943b'
                        key: {
                            application_file: '03759791914842069b954781c499dd24'
                            source_artifact: 'f10e6c353a354b4c98f853a44f337d21'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '4ae22e94452a4e2ca8da178dad36f8d8'
                        key: {
                            name: 'x_2063979_todo_saved_filter'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4d7976fccfe540cf9b7d984abf9034e3'
                        key: {
                            sys_security_acl: '1430945d709a42b9bc2fd4948e49ab9e'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4deb8c0043844e56a4c72a6460ce9538'
                        key: {
                            sys_security_acl: '2e44b2cb22a746a5a287b6041f610cba'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4dfb7abbbe434f73b50c99e09a034689'
                        key: {
                            name: 'x_2063979_todo_tag'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4e3d8eee27c445efb2fac74da09c5def'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'reminder_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '535dbbeb84784aa0a150e4afe23c72f1'
                        key: {
                            sys_security_acl: '27b821e9613747d3b9d1477e278e28b2'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '58f693dddcbf42bdaced88e086abf80c'
                        key: {
                            name: 'x_2063979_todo_saved_filter'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5bae40b00dc345dd93bcb728d01bc344'
                        key: {
                            sys_security_acl: '97e73603735342089f2be5519ffc3610'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5cc8902e778f4934a8ff70ae6eece086'
                        key: {
                            name: 'x_2063979_todo_tag'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '616a5dff11914bc8bbdd295a872866ef'
                        key: {
                            sys_security_acl: 'af6b5641da2540f6bb25efe0fe44a12e'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '623f7db8077e4bcf90af6ff71cf4fa98'
                        key: {
                            sys_security_acl: '0b600e2a8c3249cb8eb71fdede15dd1c'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '643ceb3cd42c49208dc03e1809f27810'
                        key: {
                            sys_security_acl: 'b718aa10d909451fb7d125f545ab0a73'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6447163a554a4fa3a9e7c561966a966a'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'owner'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '6a34fec9303a43afac1687569e4ba477'
                        key: {
                            role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                            contains: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6dbedbfa0f0740c6b65ea41987b4b620'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6f0cfb5ea2b046b5b7bff89d168acc04'
                        key: {
                            sys_security_acl: 'b4165ff9acfd4c59ad8ba5ce398512c5'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '71b1823a0c264f44a16b672ad37f07b7'
                        key: {
                            name: 'x_2063979_todo_tag'
                            element: 'normalized_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '751d9f43a99d4e1881cbc056788551e2'
                        key: {
                            name: 'x_2063979_todo_tag'
                            element: 'owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '787e1572b1994f9190b48b7380c16782'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'completed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '78c51e2122e6454f818cdec40c67de91'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7c102a1697c64a499dbc8fb1a44bc57c'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'priority'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7f5b035ff917434ba27f93c1c7e8637f'
                        key: {
                            name: 'x_2063979_todo_saved_filter'
                            element: 'filter_state'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '804a59bf83c7454c98487f2658eeb3b4'
                        key: {
                            name: 'x_2063979_todo_task_tag'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '82a0ffa5af8a4a898bc272778adbf1c6'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '8662b2b2611e48bb827d378f53ba528b'
                        key: {
                            name: 'x_2063979_todo_saved_filter'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '879142b7f9c54fa0b2131b25d1e5d29c'
                        key: {
                            sys_security_acl: '600dae07a61a4627afd8bd6ecb5d68ce'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '89504d2dac9848c2bc7902ca80b5638f'
                        key: {
                            sys_security_acl: '7e5dfce6298e4d53904e56352ce31ee0'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8b1850f020114f918dbdc4f822830f36'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'recurrence'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '8c4a8ebccc454fadb33c597c84f2321d'
                        key: {
                            name: 'x_2063979_todo_task'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8f68730c1d464f8fbb10210e14e32ba5'
                        key: {
                            sys_security_acl: 'ef3d483e80904f63940f111cc67934ea'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8ff16910e86f4343810d49aac3c4dcd7'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '93400d28bede44eda5ff5b57a13b6ee5'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '96af30521a714028be2501b375cc9af7'
                        key: {
                            sys_security_acl: '766f81657a454e37bb2d46e71d11396a'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '98d7282b79194bb9b79b87085b2725d7'
                        key: {
                            name: 'x_2063979_todo_saved_filter'
                            element: 'owner'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '991b015ebc4144498af3b6aeecfce8bc'
                        key: {
                            sys_security_acl: 'acf2852b5e374bbfae590ccada54c6f7'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '99cdae144b674518b3f03f2bb1cd6599'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9b02824a30dd4f288cf8f71f59811252'
                        key: {
                            sys_security_acl: '0f97fd371f9c4f13952eccba06fc374d'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '9edc94db8a3045e8960bd4d75d4fadfc'
                        key: {
                            name: 'x_2063979_todo_task'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a0aab209c31245aca025bb2b9df0d4e1'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a449ecd0f47145d39a61385294b06247'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'priority'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a45616c10794478cb5db4478cd392aa1'
                        key: {
                            sys_security_acl: '5451ecc88d9a4cd9baaea7308a17ae06'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a8807e7a964d49e691e4022ba9729547'
                        key: {
                            sys_security_acl: 'fe9f9502aa34431e888b703b76b9ef81'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b018be53cc684624ab2e153e9d148393'
                        key: {
                            sys_security_acl: 'dcec9c17924b4114a8432245205f473a'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b0416981389e47198733fe77663cf397'
                        key: {
                            sys_security_acl: 'bc3f87ccb8904a11944ce9ec39c59497'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b1a1d3425d784c25966210b546ab3eaf'
                        key: {
                            name: 'x_2063979_todo_task_tag'
                            element: 'owner'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b1f67ae4b7f5436790ec40425a8340d7'
                        key: {
                            name: 'x_2063979_todo_task_tag'
                            element: 'task'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b31b46fd96064ac2a990acb496190c28'
                        key: {
                            sys_security_acl: 'fbf0d16704314379bcb3c5290c3a087f'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b7cc3dd9350f4010968732f8007453b3'
                        key: {
                            sys_security_acl: '32e4047a2ac047df80799994d698874c'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b94b6d60b803409f81cd696d9b170592'
                        key: {
                            name: 'x_2063979_todo_tag'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'bdbdeaf47d11475ab9808df22f1983e4'
                        key: {
                            application_file: 'c74161dfc3a0436e97b49acf47666a3f'
                            source_artifact: 'f10e6c353a354b4c98f853a44f337d21'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'be608dfc30e741cc931b4ffb9fdc6bc1'
                        key: {
                            sys_security_acl: '49cd0334e31441008efce61bee620e23'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c292084d25ad4defab26216e4a446417'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'priority'
                            value: 'normal'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c31cd243b9d04ce4810b0212cd60392e'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'completed_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c34424b526af457f9ab4162bf2e3e21f'
                        key: {
                            name: 'x_2063979_todo_saved_filter'
                            element: 'filter_state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c71dda466d714c47abd28e3b21b9ba53'
                        key: {
                            name: 'x_2063979_todo_tag'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'c74161dfc3a0436e97b49acf47666a3f'
                        key: {
                            name: 'x_2063979_todo/main.js.map'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c84a654df49a4d949d635a2c8255ec69'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'c98e65284c9e419494421a6c9bcff389'
                        key: {
                            application_file: 'ec52f227dd8e4903ab8d1356ba45d91c'
                            source_artifact: 'f10e6c353a354b4c98f853a44f337d21'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cf6ff31eeed34d9b8adffc7aa60623e3'
                        key: {
                            name: 'x_2063979_todo_saved_filter'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'cfff76f0e77c43a38fd51672118c64f8'
                        key: {
                            sys_security_acl: '4bccbdccc628463b852e816c247d930c'
                            sys_user_role: {
                                id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                                key: {
                                    name: 'x_2063979_todo.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'd3fcc5fc9a9c4f5ab7abfad90fff65ab'
                        key: {
                            name: 'x_2063979_todo.user'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd5c24a9fa00940fdb02530f50a713072'
                        key: {
                            sys_security_acl: 'dc9aeeb1ea5a4f4fb753b8a17edd647e'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd90901fddc94458cb6f3facda8b4048f'
                        deleted: true
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'status'
                            value: 'open'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ddb32c6432754adfb1d87f30d69fa29b'
                        key: {
                            name: 'x_2063979_todo_task_tag'
                            element: 'task'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e1b4ed5356974cadaaeb1c6d3c01e5e2'
                        key: {
                            name: 'x_2063979_todo_task_tag'
                            element: 'tag'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e35b9e7414f54bd69740608a19c65bfa'
                        key: {
                            name: 'x_2063979_todo_tag'
                            element: 'normalized_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'ec52f227dd8e4903ab8d1356ba45d91c'
                        key: {
                            endpoint: 'x_2063979_todo_app.do'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'efa3c26cf30347dfa131a3d3ff05a491'
                        key: {
                            name: 'x_2063979_todo_task_tag'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'f10e6c353a354b4c98f853a44f337d21'
                        key: {
                            name: 'x_2063979_todo_app.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f1a193a412624d7989e44f5feae4898e'
                        key: {
                            sys_security_acl: '2f18404c6f134c46bb7434a87a718126'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f3515fc36cb5442e9a08b35323b3d242'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f75984da02c048c09a657c704375f6bb'
                        deleted: true
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'status'
                            value: 'archived'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fd462b77240c46b38b69bd2777207ba4'
                        key: {
                            sys_security_acl: 'd5ec120119024893b9c498b4f90e6dd2'
                            sys_user_role: {
                                id: '33edcab109524815b5eda8240dad816a'
                                key: {
                                    name: 'x_2063979_todo.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fdee2eb35edc4d87b745f78073fbc6f5'
                        key: {
                            name: 'x_2063979_todo_saved_filter'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fee6e5e366b94faab2a6c4df5e58669b'
                        key: {
                            name: 'x_2063979_todo_task'
                            element: 'due_at'
                        }
                    },
                ]
            }
        }
    }
}
